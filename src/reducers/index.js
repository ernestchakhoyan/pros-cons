import argumentReducer from './argumentReducer';

const allReducers = {
    cons: argumentReducer('CONS'),
    pros: argumentReducer('PROS'),
};

export default allReducers;
