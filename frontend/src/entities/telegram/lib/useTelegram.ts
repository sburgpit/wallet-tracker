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
    showMainButton: telegram.MainButton.show,
    hideMainButton: telegram.MainButton.hide,
    disableMainButton: telegram.MainButton.disable,
    onEvent: telegram.onEvent,
    offEvent: telegram.offEvent,
    viewportheight: telegram.viewportHeight,
    viewportStableHeight: telegram.viewportStableHeight,
  }
}
