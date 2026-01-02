import { Check, LoaderCircle, X } from 'lucide-react'
import { useState, type JSX } from 'react'

/**
 * Hook that manages and returns UI elements for form submission status feedback.
 *
 * @param {any} form - The form object containing formState with submission status properties
 * @param {string} errorMsg - Error message to display when form submission fails
 *
 * @returns {Object} An object containing methods to manage submission status
 * @returns {Function} getStatusElement - Returns a React element displaying the current submission status (success, loading, or error state)
 * @returns {Function} setActuallySubmitted - Sets or gets the actuallySubmitted flag. If a boolean value is provided, updates the flag; otherwise returns the current value
 *
 * @example
 * const { getStatusElement, setActuallySubmitted } = formSubmissionStatus(form, "Failed to submit");
 * return <div>{getStatusElement()}</div>;
 */
export default function formSubmissionStatus(
  form: any,
  errorMsg: string,
): {
  getStatusElement(): JSX.Element | ''
  setActuallySubmitted(value?: boolean): boolean
} {
  const [actuallySubmitted, setActuallySubmitted] = useState(false)
  const state = form.formState
  return {
    getStatusElement() {
      return state.isSubmitSuccessful && !state.isSubmitting ? (
        <span className='animate-pop-in-out flex flex-row items-center gap-2 text-sm font-semibold text-green-700'>
          <Check className='animate-pop-in-out stroke-green-700' /> Submitted!
        </span>
      ) : state.isSubmitting ? (
        <LoaderCircle className='stroke-muted-foreground animate-spin' />
      ) : !state.isSubmitting && !state.isSubmitSuccessful && actuallySubmitted ? (
        <span className='text-destructive animate-in fade-in zoom-in-90 flex flex-row items-center gap-2 text-sm font-semibold'>
          <X className='animate-in fade-in zoom-in-90 stroke-destructive' />
          {errorMsg}
        </span>
      ) : (
        ''
      )
    },
    setActuallySubmitted(value?: boolean) {
      if (value !== undefined) setActuallySubmitted(value)
      return actuallySubmitted
    },
  }
}
