import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordForm extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: [],
  }

  onDeleteItem = id => {
    const {passwordsList} = this.state
    const updatedListItems = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordsList: updatedListItems})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = event => {
    const {passwordsList} = this.state
    if (event.target.checked) {
      const newList = passwordsList.map(eachItem => ({
        ...eachItem,
        showStars: false,
      }))
      this.setState({passwordsList: newList})
    } else {
      this.setState({
        passwordsList: passwordsList.map(eachItem => ({
          ...eachItem,
          showStars: true,
        })),
      })
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newUserData = {
        id: v4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
        showStars: true,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newUserData],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  renderNoPassword = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-img"
        alt="no passwords"
      />
      <p className="no-pass-text">No Passwords</p>
    </div>
  )

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state
    const filteredList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="background">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logo"
          alt="app logo"
        />
        <div className="card-container">
          <div className="input-container">
            <h1 className="heading">Add New Password</h1>
            <form className="form" onSubmit={this.onSubmitForm}>
              <div className="web-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="web-logo"
                  alt="website"
                />
                <input
                  type="text"
                  className="web-input"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="username-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="user-logo"
                  alt="username"
                />
                <input
                  type="text"
                  className="user-input"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="pass-logo"
                  alt="password"
                />
                <input
                  type="password"
                  className="pass-input"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-img"
            alt="password manager"
          />
        </div>
        <div className="card-container2">
          <div className="pass-count-container">
            <h1 className="heading">Your Passwords</h1>
            <p className="count">{filteredList.length}</p>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-img"
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="check-box"
              id="checkBox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkBox" className="checkbox-input">
              Show Passwords
            </label>
          </div>
          {filteredList.length === 0 ? (
            this.renderNoPassword()
          ) : (
            <ul className="list-container">
              {filteredList.map(each => (
                <PasswordItem
                  key={each.id}
                  passwordDetails={each}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordForm
