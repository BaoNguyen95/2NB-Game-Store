import React from 'react';
import { Pagination } from '../../models/common.model';
import { TablePagination, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const MyPagination = (props: Pagination) => {
    const { rowsPerPage, onChangeRowsPerPage, onChangePage, total, gridSetting } = props;
    const classes = styles();
    return (
        <div className={classes.container}>
            <Card>
                <TablePagination
                    rowsPerPageOptions={rowsPerPage}
                    component="div"
                    count={total}
                    rowsPerPage={gridSetting.PageSize}
                    page={gridSetting.PageIndex}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    labelRowsPerPage="Items Per Page"
                />
            </Card>
        </div>
    );
}

const styles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    content: {

    }
});