// src/modal.ts

export function showMessage(message: string, type: 'success' | 'error' = 'success'): void {
  const modal = document.createElement('div');
  modal.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-2`;
  modal.textContent = message;

  document.body.prepend(modal);

  setTimeout(() => modal.remove(), 3000);
}

export class ModalWindow {
  private modalElement: HTMLElement;
  private confirmButton: HTMLButtonElement;
  private closeButtons: NodeListOf<Element>;
  private modalInstance: any;
  private onConfirmCallback: (() => void) | null = null;

  constructor(modalId: string, confirmButtonId: string, closeButtonClass: string) {
    this.modalElement = document.getElementById(modalId) as HTMLElement;
    this.confirmButton = document.getElementById(confirmButtonId) as HTMLButtonElement;
    this.closeButtons = document.querySelectorAll(`.${closeButtonClass}`);

    this.init();
  }

  private init() {
    // Ініціалізація Bootstrap Modal
    if ((window as any).bootstrap) {
      this.modalInstance = new (window as any).bootstrap.Modal(this.modalElement);
    }

    // Обробник підтвердження
    this.confirmButton.addEventListener('click', () => {
      if (this.onConfirmCallback) {
        this.onConfirmCallback();
      }
    });

    // Обробники закриття
    this.closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.hide();
      });
    });
  }

  show(onConfirm: () => void) {
    this.onConfirmCallback = onConfirm;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.onConfirmCallback = null;
  }
}
