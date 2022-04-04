/*
 * SonarQube
 * Copyright (C) 2009-2022 SonarSource SA
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
package org.sonar.server.platform.db.migration.version.v85;

import java.sql.SQLException;
import org.sonar.db.Database;
import org.sonar.server.platform.db.migration.def.VarcharColumnDef;
import org.sonar.server.platform.db.migration.sql.AlterColumnsBuilder;
import org.sonar.server.platform.db.migration.step.DdlChange;

import static org.sonar.server.platform.db.migration.def.VarcharColumnDef.newVarcharColumnDefBuilder;

public class MakeIssueKeyNotNullOnIssueChangesTable extends DdlChange {

  private static final String TABLE = "issue_changes";

  private static final VarcharColumnDef columnDefinition = newVarcharColumnDefBuilder()
    .setColumnName("issue_key")
    .setIsNullable(false)
    .setDefaultValue(null)
    .setLimit(VarcharColumnDef.UUID_VARCHAR_SIZE)
    .build();

  public MakeIssueKeyNotNullOnIssueChangesTable(Database db) {
    super(db);
  }

  @Override
  public void execute(Context context) throws SQLException {
    context.execute(new AlterColumnsBuilder(getDialect(), TABLE)
      .updateColumn(columnDefinition)
      .build());
  }
}