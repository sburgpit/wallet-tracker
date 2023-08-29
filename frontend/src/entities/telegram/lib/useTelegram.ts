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
    viewportheight: telegram.viewportHeight,
  }
}
