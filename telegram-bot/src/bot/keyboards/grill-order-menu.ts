export function grillMenuKeyboard(menu) {
  const keys = Object.keys(menu);

  const keyboard = keys.reduce((result, key, index) => {
    if (index % 2 === 0) {
      result.push([
        {
          text: menu[key].TEXT,
          callback_data: menu[key].ACTION,
        },
      ]);
    } else {
      result[result.length - 1].push({
        text: menu[key].TEXT,
        callback_data: menu[key].ACTION,
      });
    }
    return result;
  }, []);
  keyboard.push([
    {
      text: 'В корзину',
      callback_data: 'to_cart_action',
    },
  ]);
  return {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  };
}

