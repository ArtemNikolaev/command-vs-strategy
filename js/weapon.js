const weaponInterface = {
  name: 'Weapon Name',
  img: (()=> {
    const img = new Image();
    img.src = 'https://static.vecteezy.com/system/resources/thumbnails/000/599/613/small/03112019-33.jpg';

    return img;
  })(),
  attack: () => { console.log('some attack functionality here')},
}

export const sword = Object.assign({}, weaponInterface);
{
  sword.name = 'Мечъ';

  const img = new Image(); // Конструктор HTML5
  img.src = 'https://img2.freepng.ru/20180606/ioo/kisspng-google-logo-sword-symbol-military-symbol-5b189c385a7ec6.6996870115283395123707.jpg';
  sword.img = img;
}

export const mace = Object.assign({}, weaponInterface);
{
  mace.name = 'Палицу';
  const img = new Image(); // Конструктор HTML5
  img.src = 'https://img2.freepng.ru/20180717/bwz/kisspng-mace-weapon-drawing-club-sketch-day-to-eliminate-nuclear-weapons-5b4e5a4f7f8427.5954373015318615835223.jpg';
  mace.img = img;
}
