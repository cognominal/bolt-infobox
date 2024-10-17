import { Command as CommandPrimitive } from 'cmdk-sv'
import { Dialog as DialogPrimitive } from 'bits-ui'
import { cn } from '$lib/utils'
import { flyAndScale } from '$lib/utils'

const Command = CommandPrimitive.Root
const CommandDialog = DialogPrimitive.Root
const CommandInput = CommandPrimitive.Input
const CommandList = CommandPrimitive.List
const CommandEmpty = CommandPrimitive.Empty
const CommandGroup = CommandPrimitive.Group
const CommandItem = CommandPrimitive.Item
const CommandShortcut = CommandPrimitive.Shortcut
const CommandSeparator = CommandPrimitive.Separator

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
	//
	Command as Root,
	CommandDialog as Dialog,
	CommandInput as Input,
	CommandList as List,
	CommandEmpty as Empty,
	CommandGroup as Group,
	CommandItem as Item,
	CommandShortcut as Shortcut,
	CommandSeparator as Separator
}

export const commandStyles = {
	root: 'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
	input: 'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
	inputWrapper: 'flex items-center border-b px-3',
	list: 'max-h-[300px] overflow-y-auto overflow-x-hidden',
	empty: 'py-6 text-center text-sm',
	group: 'overflow-hidden p-1 text-foreground',
	groupHeading: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
	item: cn(
		'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
	),
	shortcut: 'ml-auto text-xs tracking-widest text-muted-foreground',
	separator: '-mx-1 h-px bg-border'
}

export const commandDialogStyles = {
	content: cn(
		'overflow-hidden p-0 shadow-lg',
		'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
		'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full'
	),
	overlay: cn(
		'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100',
		'data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out'
	)
}

export const CommandDialogComponent = (node, props) => {
	const dialog = DialogPrimitive.Root({
		target: node,
		props: {
			...props,
			open: props.open,
			onOpenChange: props.onOpenChange
		}
	})

	return {
		update(newProps) {
			dialog.$set(newProps)
		},
		destroy() {
			dialog.$destroy()
		}
	}
}

export const CommandDialogContentComponent = (node, props) => {
	const content = DialogPrimitive.Content({
		target: node,
		props: {
			...props,
			class: cn(commandDialogStyles.content, props.class),
			transition: flyAndScale
		}
	})

	return {
		update(newProps) {
			content.$set(newProps)
		},
		destroy() {
			content.$destroy()
		}
	}
}

export const CommandDialogOverlayComponent = (node, props) => {
	const overlay = DialogPrimitive.Overlay({
		target: node,
		props: {
			...props,
			class: cn(commandDialogStyles.overlay, props.class)
		}
	})

	return {
		update(newProps) {
			overlay.$set(newProps)
		},
		destroy() {
			overlay.$destroy()
		}
	}
}