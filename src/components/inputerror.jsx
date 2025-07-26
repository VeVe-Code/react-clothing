

function inputerror({ errorMessage }) {
  return (
  errorMessage && <p className="text-red-500 text-sm my-2"> {errorMessage} </p>
  )
}

export default inputerror