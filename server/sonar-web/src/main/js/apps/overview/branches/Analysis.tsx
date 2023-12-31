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
import { sortBy } from 'lodash';
import * as React from 'react';
import DateTimeFormatter from '../../../components/intl/DateTimeFormatter';
import { translate } from '../../../helpers/l10n';
import { ComponentQualifier } from '../../../types/component';
import { Analysis as TypeAnalysis } from '../../../types/project-activity';
import Event from './Event';

export interface AnalysisProps {
  analysis: TypeAnalysis;
  qualifier: string;
}

export function Analysis({ analysis, ...props }: AnalysisProps) {
  const sortedEvents = sortBy(
    analysis.events,
    // versions first
    (event) => (event.category === 'VERSION' ? 0 : 1),
    // then the rest sorted by category
    'category',
  );

  // use `TRK` for all components but applications
  const qualifier =
    props.qualifier === ComponentQualifier.Application
      ? ComponentQualifier.Application
      : ComponentQualifier.Project;

  return (
    <div className="sw-body-sm">
      <div className="sw-body-sm-highlight sw-mb-1">
        <DateTimeFormatter date={analysis.date} />
      </div>

      {sortedEvents.length > 0
        ? sortedEvents.map((event) => <Event event={event} key={event.key} />)
        : translate('project_activity.analyzed', qualifier)}
    </div>
  );
}

export default React.memo(Analysis);
