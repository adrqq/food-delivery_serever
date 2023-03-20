    await MongoAdapter.collection('products').insertMany([
      {
        id: 1,
        name: 'Spaghetti Carbonara',
        description: 'Spaghetti served with creamy sauce made of eggs, cheese, and bacon',
        price: 12.99,
        weight: 350,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 2,
        name: 'Caesar Salad',
        description: 'Romaine lettuce with croutons, Parmesan cheese, and Caesar dressing',
        price: 8.99,
        weight: 250,
        category: 'Salads',
        count: 0
      },
      {
        id: 3,
        name: 'Lobster Bisque',
        description: 'Creamy soup with chunks of fresh lobster meat and a hint of sherry',
        price: 14.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 4,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with layers of ladyfingers, mascarpone cheese, and espresso',
        price: 9.99,
        weight: 200,
        category: 'Desserts',
        count: 0
      },
      {
        id: 5,
        name: 'Iced Tea',
        description: 'Classic refreshing iced tea made with freshly brewed tea and lemon',
        price: 2.99,
        weight: 400,
        category: 'Drinks',
        count: 0
      },
      {
        id: 6,
        name: 'Greek Salad',
        description: 'Crisp lettuce with tomatoes, cucumbers, olives, and feta cheese',
        price: 7.99,
        weight: 300,
        category: 'Salads',
        count: 0
      },
      {
        id: 7,
        name: 'Beef Stroganoff',
        description: 'Tender strips of beef in a creamy sauce served over egg noodles',
        price: 15.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 8,
        name: 'Key Lime Pie',
        description: 'Tart and creamy pie made with fresh key lime juice and a graham cracker crust',
        price: 8.99,
        weight: 250,
        category: 'Desserts',
        count: 0
      },
      {
        id: 9,
        name: 'Minestrone Soup',
        description: 'Hearty Italian vegetable soup with pasta and beans',
        price: 9.99,
        weight: 350,
        category: 'Soups',
        count: 0
      },
      {
        id: 10,
        name: 'Pesto Pasta Salad',
        description: 'Rotini pasta with basil pesto, cherry tomatoes, and Parmesan cheese',
        price: 6.99,
        weight: 300,
        category: 'ColdDishes',
        count: 0
      },
      {
        id: 11,
        name: 'Fish and Chips',
        description: 'Crispy battered fish with French fries and tartar sauce',
        price: 13.99,
        weight: 450,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 12,
        name: 'Chicken Caesar Wrap',
        description: 'Grilled chicken, lettuce, Parmesan cheese, and Caesar dressing in a wrap',
        price: 10.99,
        weight: 350,
        category: 'ColdDishes',
        count: 0
      },
      {
        id: 13,
        name: 'French Onion Soup',
        description: 'Savory soup with caramelized onions and melted Gruyere cheese',
        price: 11.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 14,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
        price: 14.99,
        weight: 700,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 15,
        name: 'Caprese Salad',
        description: 'Fresh mozzarella cheese with sliced tomatoes, basil, and balsamic glaze',
        price: 9.99,
        weight: 250,
        category: 'Salads',
        count: 0
      },
      {
        id: 16,
        name: 'Fettuccine Alfredo',
        description: 'Fettuccine pasta with creamy Parmesan sauce',
        price: 12.99,
        weight: 350,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 17,
        name: 'Chocolate Mousse',
        description: 'Rich and creamy chocolate mousse with whipped cream',
        price: 7.99,
        weight: 200,
        category: 'Desserts',
        count: 0
      },
      {
        id: 18,
        name: 'Spinach Artichoke Dip',
        description: 'Warm dip with spinach, artichokes, and melted cheese',
        price: 8.99,
        weight: 350,
        category: 'ColdDishes',
        count: 0
      },
      {
        id: 19,
        name: 'Clam Chowder',
        description: 'Creamy soup with clams, potatoes, and bacon',
        price: 13.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 20,
        name: 'Margherita Flatbread',
        description: 'Thin and crispy flatbread with tomato sauce, mozzarella cheese, and fresh basil',
        price: 11.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 21,
        name: 'Greek Gyro',
        description: 'Pita bread filled with grilled lamb, tzatziki sauce, and vegetables',
        price: 12.99,
        weight: 350,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 22,
        name: 'Cobb Salad',
        description: 'Mixed greens with chicken, bacon, avocado, tomatoes, and blue cheese',
        price: 10.99,
        weight: 300,
        category: 'Salads',
        count: 0
      },
      {
        id: 23,
        name: 'Mushroom Risotto',
        description: 'Creamy rice dish with mushrooms and Parmesan cheese',
        price: 14.99,
        weight: 350,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 24,
        name: 'Chicken Noodle Soup',
        description: 'Classic soup with chicken, noodles, and vegetables',
        price: 9.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 25,
        name: 'Meatball Sub',
        description: 'Meatballs and marinara sauce in a toasted sub roll with melted provolone cheese',
        price: 11.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 26,
        name: 'Caesar Salad',
        description: 'Romaine lettuce with Parmesan cheese, croutons, and Caesar dressing',
        price: 8.99,
        weight: 250,
        category: 'Salads',
        count: 0
      },
      {
        id: 27,
        name: 'Beef Stroganoff',
        description: 'Tender beef in a creamy sauce with mushrooms and egg noodles',
        price: 14.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 28,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with layers of ladyfingers, mascarpone cheese, and coffee',
        price: 8.99,
        weight: 200,
        category: 'Desserts',
        count: 0
      },
      {
        id: 29,
        name: 'Bruschetta',
        description: 'Toasted bread with fresh tomatoes, garlic, and basil',
        price: 6.99,
        weight: 150,
        category: 'ColdDishes',
        count: 0
      },
      {
        id: 30,
        name: 'Tomato Soup',
        description: 'Classic soup with fresh tomatoes and basil',
        price: 8.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 31,
        name: 'Beef and Broccoli Stir-Fry',
        description: 'Sliced beef and broccoli in a savory sauce served over rice',
        price: 13.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 32,
        name: 'Chicken Caesar Salad',
        description: 'Romaine lettuce with grilled chicken, Parmesan cheese, croutons, and Caesar dressing',
        price: 11.99,
        weight: 300,
        category: 'Salads',
        count: 0
      },
      {
        id: 33,
        name: 'Chicken Parmesan',
        description: 'Breaded chicken with marinara sauce and melted mozzarella cheese served over pasta',
        price: 14.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 34,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with whipped cream',
        price: 7.99,
        weight: 200,
        category: 'Desserts',
        count: 0
      },
      {
        id: 35,
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil drizzled with olive oil and balsamic vinegar',
        price: 9.99,
        weight: 250,
        category: 'Salads',
        count: 0
      },
      {
        id: 36,
        name: 'Chicken Pot Pie',
        description: 'Chicken, vegetables, and gravy in a flaky crust',
        price: 12.99,
        weight: 400,
        category: 'HotDishes',
        count: 0
      },
      {
        id: 37,
        name: 'Chicken Wings',
        description: 'Crispy chicken wings tossed in your choice of sauce',
        price: 11.99,
        weight: 300,
        category: 'ColdDishes',
        count: 0
      },
      {
        id: 38,
        name: 'Chicken Noodle Soup',
        description: 'Classic soup with chicken, noodles, and vegetables',
        price: 9.99,
        weight: 300,
        category: 'Soups',
        count: 0
      },
      {
        id: 39,
        name: 'Chicken Caesar Salad',
        description: 'Romaine lettuce with grilled chicken, Parmesan cheese, croutons, and Caesar dressing',
        price: 11.99,
        weight: 300,
        category: 'Salads',
        count: 0
      },
      {
        id: 40,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with whipped cream',
        price: 7.99,
        weight: 200,
        category: 'Desserts',
        count: 0
      }
    ]).then(() => {
      console.log('Products inserted')
    }).catch(err => {
      console.log(err)
    })