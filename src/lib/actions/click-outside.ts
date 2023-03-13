export default function clickOutside<T extends () => void>(
	node: HTMLElement,
	action: T
): SvelteActionReturnType {
	let action_ = action

	function click(ev: MouseEvent): void {
		if (!node.contains(ev.target as HTMLInputElement)) {
			action_()
		}
	}

	document.addEventListener('click', click)

	return {
		destroy() {
			document.removeEventListener('click', click)
		},
		update(action: T) {
			action_ = action
		},
	}
}
