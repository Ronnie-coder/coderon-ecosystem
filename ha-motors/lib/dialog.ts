/**
 * <dialog> helpers with a fallback for old browsers (e.g. iOS < 15.4) that don't support showModal().
 * There the dialog is shown/hidden with the `open` attribute and styled by the fallback CSS in globals.css.
 */
export function openDialog(d: HTMLDialogElement | null): void {
  if (!d || d.open) return;
  if (typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open", "");
}

export function closeDialog(d: HTMLDialogElement | null): void {
  if (!d) return;
  if (typeof d.close === "function") d.close();
  else {
    d.removeAttribute("open");
    d.dispatchEvent(new Event("close"));
  }
}
