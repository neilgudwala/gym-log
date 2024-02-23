import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
const NutritionTracker = () => {
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000);
  const [proteinGoal] = useState(200);
  const [fatsGoal] = useState(60);
  const [currentProtein, setCurrentProtein] = useState(0);
  const [currentFats, setCurrentFats] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.getElementById('caloriesRemaining').innerText = dailyCalorieGoal.toFixed(2);
  }, [dailyCalorieGoal]);

  const reset = () => {
    setCurrentProtein(0);
    setCurrentFats(0);
    setDailyCalorieGoal(2000);
    document.getElementById('caloriesRemaining').innerText = dailyCalorieGoal.toFixed(2);
    document.getElementById('protein_bar').style.width = '0%';
    document.getElementById('fat_bar').style.width = '0%';
    setCount(0);

    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';
    document.getElementById('foodInput').value = '';
    document.getElementById('weightInput').value = '';
    document.getElementById('result').innerHTML = '';
  };

  const addMeal = () => {
    const foodInput = document.getElementById('foodInput').value;
    const weightInput = document.getElementById('weightInput').value;
    const mealList = document.getElementById('mealList');
    if (foodInput && weightInput) {
      mealList.innerHTML += `<li>${foodInput} - ${weightInput}</li>`;
      document.getElementById('foodInput').value = '';
      document.getElementById('weightInput').value = '';
    } else {
      alert('Please enter both a food item and an amount.');
    }
  };

  const fetchNutrients = () => {
    const foodItem = document.getElementById('foodInput').value;
    const weight = document.getElementById('weightInput').value;
    const apiKey = 'MiVuFIHCDDapfBYzWIFyB3WLjRoeNE8MvLJAtR1Z';
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(foodItem)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let result = 'No results found';
        if (data.foods?.length > 0) {
          const { foodNutrients } = data.foods[0];
          const nutrients = foodNutrients.reduce((map, obj) => (map[obj.nutrientName] = obj.value, map), {});

          const calories = nutrients['Energy'] ? ((nutrients['Energy'] * weight) / 100).toFixed(2) : 'Not available';
          const protein = nutrients['Protein'] ? ((nutrients['Protein'] * weight) / 100).toFixed(2) : 'Not available';
          const fats = nutrients['Total lipid (fat)'] ? ((nutrients['Total lipid (fat)'] * weight) / 100).toFixed(2) : 'Not available';

          result = `Calories: ${calories} kcal<br>Protein: ${protein}g<br>Fats: ${fats}g`;
          updateNutrientProgress(protein, fats);

          if (calories !== 'Not available') {
            setDailyCalorieGoal(prevGoal => prevGoal - parseFloat(calories));
            document.getElementById('caloriesRemaining').innerText = dailyCalorieGoal.toFixed(2);
          }
        }
        document.getElementById('result').innerHTML = result;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'An error occurred';
      });
  };

  const updateNutrientProgress = (protein, fats) => {
    if (protein !== 'Not available') {
      setCurrentProtein(prevProtein => prevProtein + parseFloat(protein));
      let proteinPercent = (currentProtein / proteinGoal) * 100;
      proteinPercent = proteinPercent > 100 ? 100 : proteinPercent;
      document.getElementById('protein_bar').style.width = `${proteinPercent}%`;
    }
    if (fats !== 'Not available') {
      setCurrentFats(prevFats => prevFats + parseFloat(fats));
      let fatsPercent = (currentFats / fatsGoal) * 100;
      fatsPercent = fatsPercent > 100 ? 100 : fatsPercent;
      document.getElementById('fat_bar').style.width = `${fatsPercent}%`;
    }
  };

  const updateTracker = () => {
    const counterElement = document.getElementById('counter');
    const progressBar = document.getElementById('progress');
    counterElement.textContent = `${count} of 6`;
    const progressWidth = (count / 6) * 100;
    progressBar.style.width = `${progressWidth}%`;
  };

  const handleIncrease = () => {
    if (count < 6) {
      setCount(prevCount => prevCount + 1);
      updateTracker();
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
      updateTracker();
    }
  };
  const handleButtonClick = (navItem) => {
    // Handle the button click, e.g., change the content based on the navItem
    console.log(`Button clicked: ${navItem}`);
  };
  return (
    
    <div className="container-main flex flex-col" style={{ height: '100vh' }}>
      <Sidebar handleButtonClick={handleButtonClick}/>
      <h2 className="text-4xl font-bold mb-6">Nutrition Tracker</h2>

      <div style={{ display: 'flex' }}>
        <div className="tracker-card-one">
          <h3 className="text-xl font-bold mb-4" style={{ paddingLeft: '20px' }}>
            Track your meals
          </h3>
          <ul id="mealList" className="meal-list"></ul>
          <div className="input-group">
            <input id="foodInput" type="text" placeholder="Enter food item" />
            <input id="weightInput" type="number" placeholder="Enter amount" />
            <button id="fetchNutrients" onClick={fetchNutrients}>
              Fetch Nutrients
            </button>
            <button onClick={addMeal}>Add Meal</button>
            <div id="result"></div>
            <div id="dailyCalories" style={{ marginTop: '20px' }}>
              Daily Calories Remaining: <span id="caloriesRemaining"></span>
            </div>
          </div>
        </div>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        <div className="tracker-card-two">
          <h3 className="text-xl font-bold mb-4">Eat up to 250 Calories</h3>

          <div className="progress-bar-container">
            <span>Protein</span>
            <div className="progress-bar">
              <div id="protein_bar" className="progress" style={{ width: '0%' }}></div>
              <span className="progress-label"></span>
            </div>
          </div>

          <div className="progress-bar-container">
            <span>Fats</span>
            <div className="progress-bar">
              <div id="fat_bar" className="progress" style={{ width: '0%' }}></div>
              <span className="progress-label"></span>
            </div>
          </div>
        </div>

        <div className="circular-component-container">
          <div className="circular-component">
            <span className="calories-value">45</span>
          </div>
          <div className="calories-text">Calories Left</div>
        </div>

        <div className="water-tracker">
          <h2>Water Tracker</h2>
          <div className="controls">
            <button id="decrease" onClick={handleDecrease}>
              -
            </button>
            <div id="progress-bar">
              <div id="progress"></div>
            </div>
            <button id="increase" onClick={handleIncrease}>
              +
            </button>
          </div>
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cup-straw" viewBox="0 0 16 16">
              {/* SVG path here */}
            </svg>
          </div>
          <div id="counter">{count} of 6</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
