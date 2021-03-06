const LoginForm = ({
    handleLogin ,setPassword, setUsername, username, password,
})=>{

    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          
            required
          />
        </div>
        <div>
          password
          <input
          required
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
}

export default LoginForm;