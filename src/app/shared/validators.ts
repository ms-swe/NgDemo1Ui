import { AbstractControl, ValidatorFn, isFormGroup } from '@angular/forms';

export const stopSearchCriteriaCorrect: ValidatorFn = function (
  control: AbstractControl
) {
  if (!isFormGroup(control)) {
    return null;
  }

  const name = control.get('name')?.value;
  const lon = control.get('lon')?.value;
  const lat = control.get('lat')?.value;
  const radius = control.get('radius')?.value;

  if (name !== '' && lon === '' && lat === '' && radius === '') {
    return null;
  } else if (name === '' && lon !== '' && lat !== '' && radius !== '') {
    return null;
  } else {
    return { stopsearchcriteriacorrect: true };
  }
};
