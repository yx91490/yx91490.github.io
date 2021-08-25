# 编译Impala源码

```
git clone https://gitbox.apache.org/repos/asf/impala.git ~/Impala
cd ~/Impala
export IMPALA_HOME=`pwd`
./bin/bootstrap_development.sh
```

```
wget: unable to resolve host address ‘www-us.apache.org’

/apps/home/worker/hadoop-lzo/build.xml:509



```

```
[ivy:resolve] :::: ERRORS
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/commons-logging/commons-logging/1.0.4/commons-logging-1.0.4.pom
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/commons-logging/commons-logging/1.0.4/commons-logging-1.0.4.jar
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/junit/junit/3.8.1/junit-3.8.1.pom
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/junit/junit/3.8.1/junit-3.8.1.jar
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/commons-logging/commons-logging-api/1.0.4/commons-logging-api-1.0.4.pom
[ivy:resolve] 	SERVER ERROR: HTTPS Required url=http://repo1.maven.org/maven2/commons-logging/commons-logging-api/1.0.4/commons-logging-api-1.0.4.jar
[ivy:resolve] 
```

修改 /apps/home/worker/hadoop-lzo/ivy/ivysettings.xml：

```
  <property name="repo.maven.org"
    value="https://maven.aliyun.com/repository/public/"
    override="false"/>
```



```
2021-08-02 20:40:39,650 Thread-12 INFO: Downloading http://cloudera-build-us-west-1.vpc.cloudera.com/s3/build//impala-minicluster-tarballs/kudu-1.9.0-cdh6.2.1--redhat7.tar.gz to /apps/home/worker/impala/toolchain/cdh_components-/kudu-1.9.0-cdh6.2.1--redhat7.tar.gz (attempt 1)
Traceback (most recent call last):
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 494, in <module>
    download_cdh_components(toolchain_root, cdh_components, download_path_prefix)
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 416, in download_cdh_components
    execute_many(download, cdh_components)
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 378, in execute_many
    return pool.map(f, args, 1)
  File "/usr/lib64/python2.7/multiprocessing/pool.py", line 250, in map
    return self.map_async(func, iterable, chunksize).get()
  File "/usr/lib64/python2.7/multiprocessing/pool.py", line 554, in get
    raise self._value
UnicodeEncodeError: 'ascii' codec can't encode character u'\u2018' in position 546: ordinal not in range(128)
```

```
2021-08-02 21:06:38,951 Thread-12 INFO: Downloading http://cloudera-build-us-west-1.vpc.cloudera.com/s3/build/742221/impala-minicluster-tarballs/kudu-1.9.0-cdh6.2.1-742221-redhat7.tar.gz to /apps/home/worker/impala/toolchain/cdh_components-742221/kudu-1.9.0-cdh6.2.1-742221-redhat7.tar.gz (attempt 1)
Traceback (most recent call last):
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 494, in <module>
    download_cdh_components(toolchain_root, cdh_components, download_path_prefix)
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 416, in download_cdh_components
    execute_many(download, cdh_components)
  File "/apps/home/worker/impala/bin/bootstrap_toolchain.py", line 378, in execute_many
    return pool.map(f, args, 1)
  File "/usr/lib64/python2.7/multiprocessing/pool.py", line 250, in map
    return self.map_async(func, iterable, chunksize).get()
  File "/usr/lib64/python2.7/multiprocessing/pool.py", line 554, in get
    raise self._value
UnicodeEncodeError: 'ascii' codec can't encode character u'\u2018' in position 574: ordinal not in range(128)
```

apache-Impala4.0.0编译问题：

```
Found link file:///root/apache-impala-4.0.0/infra/python/deps/pywebhdfs-0.3.2.tar.gz, version: 0.3.2
Local files found: /root/apache-impala-4.0.0/infra/python/deps/pywebhdfs-0.3.2.tar.gz
Given no hashes to check 1 links for project 'pywebhdfs': discarding no candidates
Using version 0.3.2 (newest of versions: 0.3.2)
Processing ./infra/python/deps/pywebhdfs-0.3.2.tar.gz
  Added pywebhdfs==0.3.2 from file:///root/apache-impala-4.0.0/infra/python/deps/pywebhdfs-0.3.2.tar.gz (from -r bin/../infra/python/deps/requirements.txt (line 56)) to build tracker '/tmp/pip-req-tracker-Ep2v0A'
    Running setup.py (path:/tmp/pip-install-viFSyA/pywebhdfs/setup.py) egg_info for package pywebhdfs
    Created temporary directory: /tmp/pip-pip-egg-info-5uqSBl
    Running command python setup.py egg_info
    DEPRECATION: Python 2.7 reached the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 is no longer maintained. pip 21.0 will drop support for Python 2.7 in January 2021. More details about Python 2 support in pip can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support pip 21.0 will remove support for this functionality.
    WARNING: The repository located at mirrors.cloud.aliyuncs.com is not a trusted or secure host and is being ignored. If this repository is available via HTTPS we recommend you use HTTPS instead, otherwise you may silence this warning and allow it anyway with '--trusted-host mirrors.cloud.aliyuncs.com'.
    ERROR: Could not find a version that satisfies the requirement pbr (from versions: none)
    ERROR: No matching distribution found for pbr
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/tmp/pip-install-viFSyA/pywebhdfs/setup.py", line 13, in <module>
        pbr=True)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/setuptools/__init__.py", line 161, in setup
        _install_setup_requires(attrs)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/setuptools/__init__.py", line 156, in _install_setup_requires
        dist.fetch_build_eggs(dist.setup_requires)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/setuptools/dist.py", line 721, in fetch_build_eggs
        replace_conflicting=True,
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pkg_resources/__init__.py", line 782, in resolve
        replace_conflicting=replace_conflicting
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pkg_resources/__init__.py", line 1065, in best_match
        return self.obtain(req, installer)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pkg_resources/__init__.py", line 1077, in obtain
        return installer(requirement)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/setuptools/dist.py", line 777, in fetch_build_egg
        return fetch_build_egg(self, req)
      File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/setuptools/installer.py", line 130, in fetch_build_egg
        raise DistutilsError(str(e))
    distutils.errors.DistutilsError: Command '['/root/apache-impala-4.0.0/bin/../infra/python/env-gcc7.5.0/bin/python', '-m', 'pip', '--disable-pip-version-check', 'wheel', '--no-deps', '-w', '/tmp/tmp1mbirr', '--quiet', '--index-url', 'http://mirrors.cloud.aliyuncs.com/pypi/simple/', 'pbr']' returned non-zero exit status 1
ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
Exception information:
Traceback (most recent call last):
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/cli/base_command.py", line 223, in _main
    status = self.run(options, args)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/cli/req_command.py", line 180, in wrapper
    return func(self, options, args)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/commands/install.py", line 321, in run
    reqs, check_supported_wheels=not options.target_dir
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/resolution/legacy/resolver.py", line 180, in resolve
    discovered_reqs.extend(self._resolve_one(requirement_set, req))
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/resolution/legacy/resolver.py", line 385, in _resolve_one
    dist = self._get_dist_for(req_to_install)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/resolution/legacy/resolver.py", line 337, in _get_dist_for
    dist = self.preparer.prepare_linked_requirement(req)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/operations/prepare.py", line 480, in prepare_linked_requirement
    return self._prepare_linked_requirement(req, parallel_builds)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/operations/prepare.py", line 524, in _prepare_linked_requirement
    req, self.req_tracker, self.finder, self.build_isolation,
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/operations/prepare.py", line 88, in _get_prepared_distribution
    abstract_dist.prepare_distribution_metadata(finder, build_isolation)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/distributions/sdist.py", line 41, in prepare_distribution_metadata
    self.req.prepare_metadata()
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/req/req_install.py", line 555, in prepare_metadata
    self.metadata_directory = self._generate_metadata()
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/req/req_install.py", line 535, in _generate_metadata
    details=self.name or "from {}".format(self.link)
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/operations/build/metadata_legacy.py", line 73, in generate_metadata
    command_desc='python setup.py egg_info',
  File "/root/apache-impala-4.0.0/infra/python/env-gcc7.5.0/lib/python2.7/site-packages/pip/_internal/utils/subprocess.py", line 261, in call_subprocess
    raise InstallationSubprocessError(proc.returncode, command_desc)
InstallationSubprocessError: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
Removed pywebhdfs==0.3.2 from file:///root/apache-impala-4.0.0/infra/python/deps/pywebhdfs-0.3.2.tar.gz (from -r bin/../infra/python/deps/requirements.txt (line 56)) from build tracker '/tmp/pip-req-tracker-Ep2v0A'
Removed build tracker: '/tmp/pip-req-tracker-Ep2v0A'

ERROR in bin/impala-python at line 32:
Generated: /root/apache-impala-4.0.0/logs/extra_junit_xml_logs/generate_junitxml.buildall.impala-python.20210805_11_15_44.xml
Generated: /root/apache-impala-4.0.0/logs/extra_junit_xml_logs/generate_junitxml.build.5dbddbbdbbf0589cf7dfb2df4d1f9f01.20210805_11_15_44.xml
make[3]: *** [CMakeFiles/impala_python] Error 1
make[2]: *** [CMakeFiles/impala_python.dir/all] Error 2
make[2]: *** Waiting for unfinished jobs....
```



```
pip3 install pbr
```



## 参考

[Building Impala](https://cwiki.apache.org/confluence/display/IMPALA/Building+Impala)

