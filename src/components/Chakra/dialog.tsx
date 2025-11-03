import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react"
import * as React from "react"

export interface DialogRootProps extends ChakraDialog.RootProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const DialogRoot = React.forwardRef<HTMLDivElement, DialogRootProps>(
  function DialogRoot(props, ref) {
    const { children, portalled = true, portalRef, ...rest } = props

    return (
      <ChakraDialog.Root {...rest}>
        {children}
      </ChakraDialog.Root>
    )
  }
)

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  ChakraDialog.ContentProps
>(function DialogContent(props, ref) {
  const { children, portalled = true, portalRef, ...rest } = props as any

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  )
})

export const DialogCloseTrigger = ChakraDialog.CloseTrigger
export const DialogBackdrop = ChakraDialog.Backdrop
export const DialogBody = ChakraDialog.Body
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogTitle = ChakraDialog.Title
export const DialogDescription = ChakraDialog.Description
export const DialogTrigger = ChakraDialog.Trigger
export const DialogActionTrigger = ChakraDialog.ActionTrigger

