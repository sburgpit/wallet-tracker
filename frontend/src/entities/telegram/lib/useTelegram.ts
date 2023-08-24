const telegram = Telegram.WebApp

const useTelegram = () => {
  const webApp = Telegram.WebApp

  webApp.MainButton

  return {
    telegram: telegram,
    initData: telegram.initData,
    closeApp: telegram.close,
    readyApp: telegram.ready,
    expandApp: telegram.expand,
    showMainButton: telegram.MainButton.show,
    hideMainButton: telegram.MainButton.hide,
    disableMainButton: telegram.MainButton.disable,
  }
}

export default useTelegram
