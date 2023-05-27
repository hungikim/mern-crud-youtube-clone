/* 
    Custom hook for pop-up components to close when clicked outside.

    componentRef: ref to the component where you want it closed when clicked outside of it
    buttonRef:    ref to the button that opens/closes the component.
                  it is needed because when you click the button (which is outside of the component) to close the 
                  component you don't want to also trigger the useOutsideCloser.
    toggleComponentOpen: toggler for the state that determines if the component is open or closed.
*/
/* @refresh reset */ 
import { useEffect } from "react"
 
export function useOutsideCloser(componentRef, buttonRef, toggleComponentOpen){
    useEffect(() => {
        function handleClickOutside(e) {
        if (componentRef.current && !componentRef.current.contains(e.target) 
                && (!buttonRef || !buttonRef.current || !buttonRef.current.contains(e.target) )) {
                    toggleComponentOpen()
        }
        } 
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [componentRef, buttonRef])
}
