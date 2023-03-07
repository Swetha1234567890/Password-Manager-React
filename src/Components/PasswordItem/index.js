import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeleteItem} = props
  const {id, website, username, password, showStars} = passwordDetails

  const onDeletePasswordItem = () => {
    onDeleteItem(id)
  }

  return (
    <li className="list-item-container">
      <div className="user-delete-container">
        <div className="user-name-container">
          <h1 className="first-letter">{website[0].toUpperCase()}</h1>
          <div>
            <p className="website">{website}</p>
            <p className="username">{username}</p>
            {showStars ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                className="star-img"
                alt="stars"
              />
            ) : (
              <p className="password">{password}</p>
            )}
          </div>
        </div>
        <button
          className="delete-btn"
          type="button"
          data-testid="delete"
          onClick={onDeletePasswordItem}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
