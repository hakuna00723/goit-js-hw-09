import Notiflix from 'notiflix';
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const btn = document.querySelector('button');

btn.addEventListener('click', clickOnCreatePromises);

function createPromise(position, delay) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function clickOnCreatePromises(evt) {
  evt.preventDefault();

  let delayNum = Number(delay.value);
  let amountNum = Number(amount.value);
  let stepNum = Number(step.value);

  for (let position = 1; position <= amountNum; position += 1) {
    createPromise(position, delayNum)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayNum += stepNum;
  }
}
