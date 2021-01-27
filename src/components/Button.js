import PropTypes from 'prop-types'


export const Button = ({color, text, onClick}) => {
    // const onClick = (e) => {
    //     console.log(e)
    // }

    return (
        <button 
            className='btn'
            onClick={onClick}
            style={{
                backgroundColor: color,
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px'
            }}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'press me',
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
