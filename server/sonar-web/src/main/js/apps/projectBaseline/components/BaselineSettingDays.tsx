/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import withAvailableFeatures, {
  WithAvailableFeaturesProps,
} from '../../../app/components/available-features/withAvailableFeatures';
import RadioCard from '../../../components/controls/RadioCard';
import ValidationInput, {
  ValidationInputErrorPlacement,
} from '../../../components/controls/ValidationInput';
import { Alert } from '../../../components/ui/Alert';
import MandatoryFieldsExplanation from '../../../components/ui/MandatoryFieldsExplanation';
import { translate, translateWithParameters } from '../../../helpers/l10n';
import { MAX_NUMBER_OF_DAYS, MIN_NUMBER_OF_DAYS } from '../../../helpers/periods';
import { Feature } from '../../../types/features';
import { NewCodePeriodSettingType } from '../../../types/types';

export interface Props extends WithAvailableFeaturesProps {
  className?: string;
  days: string;
  disabled?: boolean;
  isChanged: boolean;
  isValid: boolean;
  onChangeDays: (value: string) => void;
  onSelect: (selection: NewCodePeriodSettingType) => void;
  selected: boolean;
  settingLevel: BaselineSettingDaysSettingLevel;
}

export enum BaselineSettingDaysSettingLevel {
  Global = 'global',
  Project = 'project',
  Branch = 'branch',
}

function BaselineSettingDays(props: Props) {
  const {
    className,
    days,
    disabled,
    isChanged,
    isValid,
    onChangeDays,
    onSelect,
    selected,
    settingLevel,
  } = props;
  const isBranchSupportEnabled = props.hasFeature(Feature.BranchSupport);

  return (
    <RadioCard
      className={className}
      disabled={disabled}
      onClick={() => onSelect(NewCodePeriodSettingType.NUMBER_OF_DAYS)}
      selected={selected}
      title={translate('baseline.number_days')}
    >
      <>
        <div>
          <p className="sw-mb-3">{translate('baseline.number_days.description')}</p>
          <p className="sw-mb-4">{translate('baseline.number_days.usecase')}</p>
        </div>
        {selected && (
          <>
            <MandatoryFieldsExplanation />

            <ValidationInput
              labelHtmlFor="baseline_number_of_days"
              isInvalid={!isValid}
              isValid={isChanged && isValid}
              errorPlacement={ValidationInputErrorPlacement.Bottom}
              error={translateWithParameters(
                'baseline.number_days.invalid',
                MIN_NUMBER_OF_DAYS,
                MAX_NUMBER_OF_DAYS
              )}
              label={translate('baseline.specify_days')}
              required={true}
            >
              <input
                id="baseline_number_of_days"
                onChange={(e) => onChangeDays(e.currentTarget.value)}
                type="text"
                value={days}
              />
            </ValidationInput>

            {!isChanged && !isValid && (
              <Alert variant="warning" className="sw-mt-2">
                <p className="sw-mb-2 sw-font-bold">
                  {translate('baseline.number_days.compliance_warning.title')}
                </p>
                <p className="sw-mb-2">
                  {translate(
                    `baseline.number_days.compliance_warning.content.${settingLevel}${
                      isBranchSupportEnabled &&
                      settingLevel === BaselineSettingDaysSettingLevel.Project
                        ? '.with_branch_support'
                        : ''
                    }`
                  )}
                </p>
              </Alert>
            )}
          </>
        )}
      </>
    </RadioCard>
  );
}

export default withAvailableFeatures(BaselineSettingDays);
