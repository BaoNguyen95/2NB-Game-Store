export const MaterialBoxShadow = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
}

export const MaterialBoxShadowHover = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.3)",
    '&:hover': {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
    transition: '0.3s'
}

export const TextHoverStyle = {
    '&:hover': {
        color: '#00a19c'
    },
    transition: '0.3s'
}

export const AppStyleMainLinear = {
    backgroundImage: 'linear-gradient(to right, #536976, #292e49)',
}

export const TextStyle = {
    variant: 'outlined',
}

export const OutLinedStyle = {
    borderWidth: "1px",
    borderColor: "black !important"
}