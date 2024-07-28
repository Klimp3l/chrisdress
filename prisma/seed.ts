const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const create = async () => {
  const girls = [
    { name: "Alana Muniz" },
    { name: "Anna Ruth Lima" },
    { name: "Bruna Ishikawa" },
    { name: "Camila Meltior" },
    { name: "Camila Fabbris" },
    { name: "Isabela Ribas" },
    { name: "Lorena Klimpel" },
    { name: "Isadora Maria" },
    { name: "Maryana Cruz" },
    { name: "Nicolle Trindade" },
    { name: "Julia Zanello" },
    { name: "Sarah Iukis" },
    { name: "Rhanah Oliveira" },
    { name: "Gabriela Bissani" },
    { name: "Julia Merética" },
    { name: "Mercella Rangel" }
  ]

  for (const item of girls) {
    await db.girl.create({
      data: item
    });
  }

  const classes = [
    {
      'class': 'Amarelo',
      'colors': [
        '#ffd500',
        '#ffdc2e',
        '#ffe761',
        '#ffea76',
        '#fff394'
      ]
    },
    {
      'class': 'Laranja',
      'colors': [
        '#dc6601',
        '#e27602',
        '#e88504',
        '#ec9006',
        '#ee9727'
      ]
    },
    {
      'class': 'Terracota',
      'colors': [
        '#883000',
        '#793802',
        '#944000',
        '#813f0b',
        '#bf5700'
      ]
    },
    {
      'class': 'Vermelho',
      'colors': [
        '#c30010',
        '#d1001f',
        '#de0a26',
        '#f01e2c',
        '#ff2c2c',
        '#771713',
        '#851a15',
        '#9a1e18',
        '#af231c',
        '#dd372f'
      ]
    },
    {
      'class': 'Rosa',
      'colors': [
        '#bb437e',
        '#d24787',
        '#e44b8d',
        '#e2619f',
        '#e27bb1',
        '#7e1037',
        '#c14e76',
        '#df7da6',
        '#f7b2cf',
        '#f99dbc'
      ]
    },
    {
      'class': 'Roxo',
      'colors': [
        '#6b1371',
        '#913781',
        '#a84296',
        '#cd8ec0',
        '#e1bbd9',
        '#4b1c71',
        '#7f4ca5',
        '#b57edc',
        '#dbb6ee',
        '#dbbcdf'
      ]
    },
    {
      'class': 'Azul',
      'colors': [
        '#000080',
        '#192586',
        '#27379b',
        '#384bb4',
        '#3f54be',
        '#1d2951',
        '#003152',
        '#588bae',
        '#57a0d3',
        '#79baec',
        '#18848e',
        '#1a98a6',
        '#1dadc0',
        '#1fbdd2',
        '#33c7d8'
      ]
    },
    {
      'class': 'Verde',
      'colors': [
        '#20331b',
        '#414833',
        '#656d4a',
        '#6d712e',
        '#a2a569',
        '#356258',
        '#3a7267',
        '#3f8276',
        '#448f82',
        '#509f94',
        '#035718',
        '#378552',
        '#008631',
        '#00ab41',
        '#00c04b'
      ]
    },
    {
      'class': 'Marrom',
      'colors': [
        '#5b1f00',
        '#66280a',
        '#713112',
        '#7c3b1a',
        '#9a5833'
      ]
    }
  ];

  for (const item of classes) {
    const classe = await db.class.create({
      data: {
        name: item.class,
      }
    });

    for (const item2 of item.colors) {
      await db.color.create({
        data: {
          hex: item2,
          classId: classe.id
        },
      });
    }   
  }

};

const main = async () => {
  await create();
};

main()
  .then(() => {
    console.log("Seed do banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });