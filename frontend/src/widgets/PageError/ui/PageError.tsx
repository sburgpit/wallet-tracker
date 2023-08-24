export const PageError = () => {
  const reloadPage = () => {
    location.reload()
  }

  return (
    <div>
      <p>{`Page Error`}</p>
      <button onClick={reloadPage}>Reload</button>
    </div>
  )
}
