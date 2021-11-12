import React, { useState, useEffect, useRef } from 'react';
import './product.scss';
import ProductItems from './components/product-list-item';
import { GridSetting } from '../../models/common.model';

import { MyPagination } from '../../shared/components/my-pagination';
import { useStateValue } from '../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../constants/actionTypes';
import { useLoading } from '../../hooks';
import ProductService from './service/product.service';

export default function ProductsPage(props: any) {
  let [product, setProduct] = useState();
  let [gridSetting, setGridSetting] = useState(new GridSetting);
  let [currentCategory, setCategory] = useState();

  const productService = new ProductService();

  const setLoading: any = useLoading();

  let search = {};

  const [{ category }, dispatch]: any = useStateValue();

  useEffect(() => {
    onSearch(category);
  }, [gridSetting.PageIndex, gridSetting.PageSize, category.id]);

  const onSearch = (category: any) => {
    // if (currentCategory !== category) {
    //   setGridSetting({ ...gridSetting, PageIndex: 0 });
    // }
    search = { ...search, category: category.id, gridSetting };
    getProduct();
    setCategory(category);
  }

  const getProduct = () => {
    setLoading(true);
    productService.getProducts(search, (result) => {
      setLoading(false);
      if (result.count || result.count === 0) {
        setProduct(result);
      } else {

      }
    });
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridSetting({
      ...gridSetting,
      PageSize: parseInt(event.target.value),
      PageIndex: 0,
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setGridSetting({
      ...gridSetting,
      PageIndex: newPage
    })
  }

  return (
    <div className="landing-content" >
      <div className={"topContent"}>
        <div className={"title"}>{category.name ? category.name : 'All Games'}</div>
        <MyPagination
          rowsPerPage={[8, 16, 32]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          gridSetting={gridSetting}
          onChangePage={handleChangePage}
          total={product ? product.count : 0}
        />
      </div>
      <div className="list-product">
        <ProductItems data={product ? product : []} />
      </div>
    </div>
  )
}