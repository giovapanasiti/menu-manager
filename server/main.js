import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (Category.find().count() < 1) {
    var category = [
      {
        nameIt: 'Antipasti',
        nameFr: 'Entrée',
        nameDe: 'Vorspeise',
        nameEn: 'Starter',
        categoryOrder: 1
      },
      {
        nameIt: 'Primi Piatti',
        nameFr: 'Premiers Cours',
        nameDe: 'Erste Kurse',
        nameEn: 'First Dishes',
        categoryOrder: 2
      },
      {
        nameIt: 'Secondi Piatti',
        nameFr: 'Plat Principal',
        nameDe: 'Hauptgericht',
        nameEn: 'Second Dish',
        categoryOrder: 2
      },
      {
        nameIt: 'Dolci',
        nameFr: 'Confiserie',
        nameDe: 'Süßwaren',
        nameEn: 'Dessert',
        categoryOrder: 2
      },
    ];

    category.forEach(function(category) {
      Category.insert(category);
    });
  }
});
