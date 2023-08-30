import { promisify } from 'shared/lib/utils/promisify'
const telegram = Telegram.WebApp

export const useTelegram = () => {
  const webApp = Telegram.WebApp

  webApp.MainButton

  return {
    telegram: telegram,
    initData: telegram.initDataUnsafe,
    isExpanded: telegram.isExpanded,
    closeApp: telegram.close,
    readyApp: telegram.ready,
    expandApp: telegram.expand,
    onEvent: telegram.onEvent,
    offEvent: telegram.offEvent,
    showAlert: telegram.showAlert,
    showConfirm: promisify(telegram.showConfirm),
    viewportheight: telegram.viewportHeight,
  }
}
