import classNames from "classnames"

const Button = ({ label, loading, onClick, color = 'primary' }) => {
  return <button type="button" className={classNames({
    button: true,
    [`button--${color}`]: true
  })} onClick={onClick}>{label}</button>
}

export default Button