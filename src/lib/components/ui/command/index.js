import { Command as CommandPrimitive } from 'cmdk-sv'
import { Dialog as DialogPrimitive } from 'bits-ui'
import { cn } from '$lib/utils'
import { commandStyles, commandDialogStyles } from './command.js'

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
	commandStyles,
	commandDialogStyles
}