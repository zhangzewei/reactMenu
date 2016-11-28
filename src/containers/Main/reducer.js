import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  nothing: '',
});

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
