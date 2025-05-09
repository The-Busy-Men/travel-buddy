import { isValidNumber, isValidString } from "../validation/validation";

function RequiredInputText() {
  return (
    <>
      <span className="text-error text-sm">Required to proceed</span>
    </>
  )
}

const RequiredValidInput = ({input, type}: {input: any, type: 'string' | 'number'}) => {
  try
  {
    switch (type) {
      case 'string': {
        return isValidString(String(input)) ? <></> : <RequiredInputText />
      }

      case 'number': {
        return isValidNumber(Number(input)) ? <></> : <RequiredInputText />
      }
    }
  }
  catch (err) {
    console.warn(err)
    return <span className="text-error">Invalid input</span>;
  }
}

export { RequiredInputText, RequiredValidInput };