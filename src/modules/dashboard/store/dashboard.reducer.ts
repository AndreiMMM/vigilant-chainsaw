import { DashboardStateInterface } from '../models/contacts.adapter.interface';
import { dashboardAdapter } from './dashboard.adapter';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions';

export function dashboardInitialState(): DashboardStateInterface {
  return dashboardAdapter.getInitialState({
    loaded: false,
    loading: false,
  });
}

export function dashboardReducer(
  state: DashboardStateInterface = dashboardInitialState(),
  action: DashboardActions
): DashboardStateInterface {
  switch (action.type) {
    case DashboardActionTypes.LOAD_CONTACTS_SUCCESS:
      return dashboardAdapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: false,
      });

    case DashboardActionTypes.ADD_SUCCESS:
      return dashboardAdapter.addOne(action.contact, {
        ...state,
        loaded: true,
        loading: false,
        error: false,
      });

    case DashboardActionTypes.DELETE_SUCCESS:
      return dashboardAdapter.removeOne(action.id, {
        ...state,
        loaded: true,
        loading: false,
        error: false,
      });

    case DashboardActionTypes.UPDATE_SUCCESS:
      const { id } = action.contact;
      return dashboardAdapter.updateOne(
        {
          id,
          changes: action.contact,
        },
        { ...state, loaded: true, loading: false, error: false }
      );

    case DashboardActionTypes.ADD:
    case DashboardActionTypes.LOAD_CONTACTS:
    case DashboardActionTypes.UPDATE:
    case DashboardActionTypes.DELETE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };

    case DashboardActionTypes.ADD_FAILED:
    case DashboardActionTypes.LOAD_CONTACTS_FAILED:
    case DashboardActionTypes.UPDATE_FAILED:
    case DashboardActionTypes.DELETE_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
}
