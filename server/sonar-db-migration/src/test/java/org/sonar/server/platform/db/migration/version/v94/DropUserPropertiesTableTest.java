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
package org.sonar.server.platform.db.migration.version.v94;

import java.sql.SQLException;
import org.junit.Rule;
import org.junit.Test;
import org.sonar.db.CoreDbTester;

public class DropUserPropertiesTableTest {
  private static final String TABLE_NAME = "user_properties";

  @Rule
  public final CoreDbTester db = CoreDbTester.createForSchema(DropUserPropertiesTableTest.class, "schema.sql");

  private final DropUserPropertiesTable underTest = new DropUserPropertiesTable(db.database());

  @Test
  public void migration_should_drop_table() throws SQLException {
    db.assertTableExists(TABLE_NAME);
    underTest.execute();
    db.assertTableDoesNotExist(TABLE_NAME);
  }

  @Test
  public void migration_should_be_reentrant() throws SQLException {
    db.assertTableExists(TABLE_NAME);
    underTest.execute();
    // re-entrant
    underTest.execute();
    db.assertTableDoesNotExist(TABLE_NAME);
  }
}