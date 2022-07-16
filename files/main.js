let search = document.getElementById('search');
let submit = document.getElementById('submit');
let random = document.getElementById('random');
let mealsEl = document.getElementById('meals');
let resulHeading = document.getElementById('result-heading');
let singleMealEl = document.getElementById('single-meals');


// search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();
  singleMealEl.innerHTML = '';
  let term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        resulHeading.innerHTML = `<h2>Search reslts for ${term}:</h2>`;
        if (data.meals === null || data.meals.length == 0) {
          resulHeading.innerHTML = `<p>There are no search results</p>`;
        } else {
          const newData = data.meals;
          mealsEl.innerHTML = ''
          for (let index = 0; index < newData.length; index++) {
            const meal = newData[index];
            mealsEl.innerHTML += `
                 <div class="meal">
                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                 <div class="meal-info" data-mealID="${meal.idMeal}">
                 <h3>${meal.strMeal}</h3>
                 </div>
                 </div>
                 `
          }
        }
      }).catch(err => {
        mealsEl.innerHTML = err;
      })
  } else {
    alert('enter a search');
  }

}

// event  listeners
search.addEventListener('input', searchMeal);