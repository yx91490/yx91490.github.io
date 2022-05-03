# PostgreSQL学习笔记

## 安装部署

// TODO

## 命令行

### psql

使用帮助（`psql  --help`）：

```
psql is the PostgreSQL interactive terminal.

Usage:
  psql [OPTION]... [DBNAME [USERNAME]]

General options:
  -c, --command=COMMAND    run only single command (SQL or internal) and exit
  -d, --dbname=DBNAME      database name to connect to (default: "$(pwd)")
  -f, --file=FILENAME      execute commands from file, then exit
  -l, --list               list available databases, then exit
  -v, --set=, --variable=NAME=VALUE
                           set psql variable NAME to VALUE
  -V, --version            output version information, then exit
  -X, --no-psqlrc          do not read startup file (~/.psqlrc)
  -1 ("one"), --single-transaction
                           execute command file as a single transaction
  -?, --help               show this help, then exit

Input and output options:
  -a, --echo-all           echo all input from script
  -e, --echo-queries       echo commands sent to server
  -E, --echo-hidden        display queries that internal commands generate
  -L, --log-file=FILENAME  send session log to file
  -n, --no-readline        disable enhanced command line editing (readline)
  -o, --output=FILENAME    send query results to file (or |pipe)
  -q, --quiet              run quietly (no messages, only query output)
  -s, --single-step        single-step mode (confirm each query)
  -S, --single-line        single-line mode (end of line terminates SQL command)

Output format options:
  -A, --no-align           unaligned table output mode
  -F, --field-separator=STRING
                           set field separator (default: "|")
  -H, --html               HTML table output mode
  -P, --pset=VAR[=ARG]     set printing option VAR to ARG (see \pset command)
  -R, --record-separator=STRING
                           set record separator (default: newline)
  -t, --tuples-only        print rows only
  -T, --table-attr=TEXT    set HTML table tag attributes (e.g., width, border)
  -x, --expanded           turn on expanded table output
  -z, --field-separator-zero
                           set field separator to zero byte
  -0, --record-separator-zero
                           set record separator to zero byte

Connection options:
  -h, --host=HOSTNAME      database server host or socket directory (default: "local socket")
  -p, --port=PORT          database server port (default: "5432")
  -U, --username=USERNAME  database user name (default: "$(pwd)")
  -w, --no-password        never prompt for password
  -W, --password           force password prompt (should happen automatically)

For more information, type "\?" (for internal commands) or "\help" (for SQL
commands) from within psql, or consult the psql section in the PostgreSQL
documentation.
```

交互式命令行帮助：

```
=> \?
General
  \copyright             show PostgreSQL usage and distribution terms
  \g [FILE] or ;         execute query (and send results to file or |pipe)
  \h [NAME]              help on syntax of SQL commands, * for all commands
  \q                     quit psql

Query Buffer
  \e [FILE] [LINE]       edit the query buffer (or file) with external editor
  \ef [FUNCNAME [LINE]]  edit function definition with external editor
  \p                     show the contents of the query buffer
  \r                     reset (clear) the query buffer
  \s [FILE]              display history or save it to file
  \w FILE                write query buffer to file

Input/Output
  \copy ...              perform SQL COPY with data stream to the client host
  \echo [STRING]         write string to standard output
  \i FILE                execute commands from file
  \ir FILE               as \i, but relative to location of current script
  \o [FILE]              send all query results to file or |pipe
  \qecho [STRING]        write string to query output stream (see \o)

Informational
  (options: S = show system objects, + = additional detail)
  \d[S+]                 list tables, views, and sequences
  \d[S+]  NAME           describe table, view, sequence, or index
  \da[S]  [PATTERN]      list aggregates
  \db[+]  [PATTERN]      list tablespaces
  \dc[S+] [PATTERN]      list conversions
  \dC[+]  [PATTERN]      list casts
  \dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
  \ddp    [PATTERN]      list default privileges
  \dD[S+] [PATTERN]      list domains
  \det[+] [PATTERN]      list foreign tables
  \des[+] [PATTERN]      list foreign servers
  \deu[+] [PATTERN]      list user mappings
  \dew[+] [PATTERN]      list foreign-data wrappers
  \df[antw][S+] [PATRN]  list [only agg/normal/trigger/window] functions
  \dF[+]  [PATTERN]      list text search configurations
  \dFd[+] [PATTERN]      list text search dictionaries
  \dFp[+] [PATTERN]      list text search parsers
  \dFt[+] [PATTERN]      list text search templates
  \dg[+]  [PATTERN]      list roles
  \di[S+] [PATTERN]      list indexes
  \dl                    list large objects, same as \lo_list
  \dL[S+] [PATTERN]      list procedural languages
  \dn[S+] [PATTERN]      list schemas
  \do[S]  [PATTERN]      list operators
  \dO[S+] [PATTERN]      list collations
  \dp     [PATTERN]      list table, view, and sequence access privileges
  \drds [PATRN1 [PATRN2]] list per-database role settings
  \ds[S+] [PATTERN]      list sequences
  \dt[S+] [PATTERN]      list tables
  \dT[S+] [PATTERN]      list data types
  \du[+]  [PATTERN]      list roles
  \dv[S+] [PATTERN]      list views
  \dE[S+] [PATTERN]      list foreign tables
  \dx[+]  [PATTERN]      list extensions
  \l[+]                  list all databases
  \sf[+] FUNCNAME        show a function's definition
  \z      [PATTERN]      same as \dp

Formatting
  \a                     toggle between unaligned and aligned output mode
  \C [STRING]            set table title, or unset if none
  \f [STRING]            show or set field separator for unaligned query output
  \H                     toggle HTML output mode (currently off)
  \pset NAME [VALUE]     set table output option
                         (NAME := {format|border|expanded|fieldsep|fieldsep_zero|footer|null|
                         numericlocale|recordsep|recordsep_zero|tuples_only|title|tableattr|pager})
  \t [on|off]            show only rows (currently off)
  \T [STRING]            set HTML <table> tag attributes, or unset if none
  \x [on|off|auto]       toggle expanded output (currently off)

Connection
  \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
                         connect to new database (currently "xxx")
  \encoding [ENCODING]   show or set client encoding
  \password [USERNAME]   securely change the password for a user
  \conninfo              display information about current connection

Operating System
  \cd [DIR]              change the current working directory
  \setenv NAME [VALUE]   set or unset environment variable
  \timing [on|off]       toggle timing of commands (currently off)
  \! [COMMAND]           execute command in shell or start interactive shell

Variables
  \prompt [TEXT] NAME    prompt user to set internal variable
  \set [NAME [VALUE]]    set internal variable, or list all if no parameters
  \unset NAME            unset (delete) internal variable

Large Objects
  \lo_export LOBOID FILE
  \lo_import FILE [COMMENT]
  \lo_list
  \lo_unlink LOBOID      large object operations
```

可用SQL语句：

```
Available help:
  ABORT                            COMMENT                          DECLARE                          EXECUTE
  ALTER AGGREGATE                  COMMIT                           DELETE                           EXPLAIN
  ALTER COLLATION                  COMMIT PREPARED                  DISCARD                          FETCH
  ALTER CONVERSION                 COPY                             DO                               GRANT
  ALTER DATABASE                   CREATE AGGREGATE                 DROP AGGREGATE                   INSERT
  ALTER DEFAULT PRIVILEGES         CREATE CAST                      DROP CAST                        LISTEN
  ALTER DOMAIN                     CREATE COLLATION                 DROP COLLATION                   LOAD
  ALTER EXTENSION                  CREATE CONVERSION                DROP CONVERSION                  LOCK
  ALTER FOREIGN DATA WRAPPER       CREATE DATABASE                  DROP DATABASE                    MOVE
  ALTER FOREIGN TABLE              CREATE DOMAIN                    DROP DOMAIN                      NOTIFY
  ALTER FUNCTION                   CREATE EXTENSION                 DROP EXTENSION                   PREPARE
  ALTER GROUP                      CREATE FOREIGN DATA WRAPPER      DROP FOREIGN DATA WRAPPER        PREPARE TRANSACTION
  ALTER INDEX                      CREATE FOREIGN TABLE             DROP FOREIGN TABLE               REASSIGN OWNED
  ALTER LANGUAGE                   CREATE FUNCTION                  DROP FUNCTION                    REINDEX
  ALTER LARGE OBJECT               CREATE GROUP                     DROP GROUP                       RELEASE SAVEPOINT
  ALTER OPERATOR                   CREATE INDEX                     DROP INDEX                       RESET
  ALTER OPERATOR CLASS             CREATE LANGUAGE                  DROP LANGUAGE                    REVOKE
  ALTER OPERATOR FAMILY            CREATE OPERATOR                  DROP OPERATOR                    ROLLBACK
  ALTER ROLE                       CREATE OPERATOR CLASS            DROP OPERATOR CLASS              ROLLBACK PREPARED
  ALTER SCHEMA                     CREATE OPERATOR FAMILY           DROP OPERATOR FAMILY             ROLLBACK TO SAVEPOINT
  ALTER SEQUENCE                   CREATE ROLE                      DROP OWNED                       SAVEPOINT
  ALTER SERVER                     CREATE RULE                      DROP ROLE                        SECURITY LABEL
  ALTER TABLE                      CREATE SCHEMA                    DROP RULE                        SELECT
  ALTER TABLESPACE                 CREATE SEQUENCE                  DROP SCHEMA                      SELECT INTO
  ALTER TEXT SEARCH CONFIGURATION  CREATE SERVER                    DROP SEQUENCE                    SET
  ALTER TEXT SEARCH DICTIONARY     CREATE TABLE                     DROP SERVER                      SET CONSTRAINTS
  ALTER TEXT SEARCH PARSER         CREATE TABLE AS                  DROP TABLE                       SET ROLE
  ALTER TEXT SEARCH TEMPLATE       CREATE TABLESPACE                DROP TABLESPACE                  SET SESSION AUTHORIZATION
  ALTER TRIGGER                    CREATE TEXT SEARCH CONFIGURATION DROP TEXT SEARCH CONFIGURATION   SET TRANSACTION
  ALTER TYPE                       CREATE TEXT SEARCH DICTIONARY    DROP TEXT SEARCH DICTIONARY      SHOW
  ALTER USER                       CREATE TEXT SEARCH PARSER        DROP TEXT SEARCH PARSER          START TRANSACTION
  ALTER USER MAPPING               CREATE TEXT SEARCH TEMPLATE      DROP TEXT SEARCH TEMPLATE        TABLE
  ALTER VIEW                       CREATE TRIGGER                   DROP TRIGGER                     TRUNCATE
  ANALYZE                          CREATE TYPE                      DROP TYPE                        UNLISTEN
  BEGIN                            CREATE USER                      DROP USER                        UPDATE
  CHECKPOINT                       CREATE USER MAPPING              DROP USER MAPPING                VACUUM
  CLOSE                            CREATE VIEW                      DROP VIEW                        VALUES
  CLUSTER                          DEALLOCATE                       END                              WITH
```

常用语句：

```sql
-- 需切换到postgres用户执行
-- sudo su - postgres
-- psql -U <user> -d <database> -h 127.0.0.1
CREATE USER user1 WITH PASSWORD 'password';
CREATE DATABASE db1;
GRANT ALL PRIVILEGES ON DATABASE db1 to user1;
ALTER USER user1 WITH PASSWORD 'new_password';
```

### createdb

使用帮助（`createdb  --help`）：

```
createdb creates a PostgreSQL database.

Usage:
  createdb [OPTION]... [DBNAME] [DESCRIPTION]

Options:
  -D, --tablespace=TABLESPACE  default tablespace for the database
  -e, --echo                   show the commands being sent to the server
  -E, --encoding=ENCODING      encoding for the database
  -l, --locale=LOCALE          locale settings for the database
      --lc-collate=LOCALE      LC_COLLATE setting for the database
      --lc-ctype=LOCALE        LC_CTYPE setting for the database
  -O, --owner=OWNER            database user to own the new database
  -T, --template=TEMPLATE      template database to copy
  -V, --version                output version information, then exit
  -?, --help                   show this help, then exit

Connection options:
  -h, --host=HOSTNAME          database server host or socket directory
  -p, --port=PORT              database server port
  -U, --username=USERNAME      user name to connect as
  -w, --no-password            never prompt for password
  -W, --password               force password prompt
  --maintenance-db=DBNAME      alternate maintenance database

By default, a database with the same name as the current user is created.
```

遗憾的是，没有办法实现语法：“CREATE DATABASE IF NOT EXISTS xxx”。

### dropdb

使用帮助（`dropdb  --help`）：

```
dropdb removes a PostgreSQL database.

Usage:
  dropdb [OPTION]... DBNAME

Options:
  -e, --echo                show the commands being sent to the server
  -i, --interactive         prompt before deleting anything
  -V, --version             output version information, then exit
  --if-exists               don't report error if database doesn't exist
  -?, --help                show this help, then exit

Connection options:
  -h, --host=HOSTNAME       database server host or socket directory
  -p, --port=PORT           database server port
  -U, --username=USERNAME   user name to connect as
  -w, --no-password         never prompt for password
  -W, --password            force password prompt
  --maintenance-db=DBNAME   alternate maintenance database
```

### createuser

使用帮助（`createuser  --help`）：

```
createuser creates a new PostgreSQL role.

Usage:
  createuser [OPTION]... [ROLENAME]

Options:
  -c, --connection-limit=N  connection limit for role (default: no limit)
  -d, --createdb            role can create new databases
  -D, --no-createdb         role cannot create databases (default)
  -e, --echo                show the commands being sent to the server
  -E, --encrypted           encrypt stored password
  -i, --inherit             role inherits privileges of roles it is a
                            member of (default)
  -I, --no-inherit          role does not inherit privileges
  -l, --login               role can login (default)
  -L, --no-login            role cannot login
  -N, --unencrypted         do not encrypt stored password
  -P, --pwprompt            assign a password to new role
  -r, --createrole          role can create new roles
  -R, --no-createrole       role cannot create roles (default)
  -s, --superuser           role will be superuser
  -S, --no-superuser        role will not be superuser (default)
  -V, --version             output version information, then exit
  --interactive             prompt for missing role name and attributes rather
                            than using defaults
  --replication             role can initiate replication
  --no-replication          role cannot initiate replication
  -?, --help                show this help, then exit

Connection options:
  -h, --host=HOSTNAME       database server host or socket directory
  -p, --port=PORT           database server port
  -U, --username=USERNAME   user name to connect as (not the one to create)
  -w, --no-password         never prompt for password
  -W, --password            force password prompt
```

### dropuser

使用帮助（`dropuser  --help`）：

```
dropuser removes a PostgreSQL role.

Usage:
  dropuser [OPTION]... [ROLENAME]

Options:
  -e, --echo                show the commands being sent to the server
  -i, --interactive         prompt before deleting anything, and prompt for
                            role name if not specified
  -V, --version             output version information, then exit
  --if-exists               don't report error if user doesn't exist
  -?, --help                show this help, then exit

Connection options:
  -h, --host=HOSTNAME       database server host or socket directory
  -p, --port=PORT           database server port
  -U, --username=USERNAME   user name to connect as (not the one to drop)
  -w, --no-password         never prompt for password
  -W, --password            force password prompt
```

## 参考

[PostgreSQL教程](https://www.yiibai.com/postgresql)