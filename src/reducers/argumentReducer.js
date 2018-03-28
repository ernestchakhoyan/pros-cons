const argumentReducer = (postfix) => (
    (state = [], action) => {
        switch (action.type) {
            case `CREATE_${postfix}`:
                return [
                    ...state,
                    {
                        id: action.id,
                        value: action.value,
                    }
                ];
            case `UPDATE_${postfix}`:
                let newState;

                if (action.value !== '') {
                    newState = [ ...state ];

                    const item = newState.find(item => item.id === action.id);

                    if (item !== undefined) {
                        item.value = action.value;
                    } else {
                        newState = argumentReducer(postfix)(newState, {
                            type: `CREATE_${postfix}`,
                            id: action.id,
                            value: action.value,
                        });
                    }
                } else {
                    newState = argumentReducer(postfix)(state, {
                        type: `REMOVE_${postfix}`,
                        id: action.id,
                    });
                }

                return newState;
            case `REMOVE_${postfix}`:
                return state.filter(item => item.id !== action.id);
            default:
                return state;
        }
    }
);

export default argumentReducer;
