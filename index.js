function createStore() {
  const listeners = [];
  const data = {};
 
  function emitChange() {
    listeners.forEach(listener => listener());
  }
 
  function subscribe(callback) {
    listeners.push(callback);
  }
 
  function setData(key, value) {
    data[key] = value;
    emitChange();
  }
 
  function getData() {
    return data;
  }
 
  return {
    subscribe,
    setData,
    getData,
  };
}


// Creating a store

const store = createStore();

store.subscribe(() => {
  const storeData = store.getData();
  console.log('Updated store data:', storeData);
});

store.setData('flavor', 'chocolate');

// Testing the subscribe() function

describe('store', function () {
  it('should call a listener every time the store data updates',
    function () {
      const store = createStore();
      const spy = sinon.spy();

      store.subscribe(spy);
      store.setData('flavor', 'chocolate');
      expect(spy.calledOnce).toBeTruthy();
      store.setData('topping', 'sprinkles');
      expect(spy.calledTwice).toBeTruthy();
    })
});


// SPYING ON EXISTING FUNCTIONS
// Sometimes, we're testing a function where we have to verify that another function has been called.
// Rather than completely overwriting the function to be called with a spy of our own (and re-implementing
// all of its logic in the process, or the test will fail), we can just spy on the existing function
// instead!
// Spying on functions is especially handy when trying to verify if your code is calling library
// functions correctly (for example, a jQuery AJAX call). Let's take a look at some example code:


function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

function welcomePersonAtTheDoor(person) {
  door.open();
  sayHello(person.firstName);
  door.close();
}

// Let's say we want to verify sayHello() function works as intended. We can simplay spy on the function using Sinon...

describe('sayHello()', () => {
  it('should call the sayHello() function', () => {
    const spy = sinon.spy(window, 'sayHello');
    welcomePersonAtTheDoor({firstName: 'Stephanie'});
    expect(spy.calledOnce).toBeTruthy();
  })
})


// What's happening here? Well, Sinon is basically wrapping the sayHello() function so that we can
// spy on the function and verify that it has been called. That's it!
