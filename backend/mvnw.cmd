@REM ----------------------------------------------------------------------------
@REM Maven Wrapper for Sheladiya Consultancy Backend
@REM Auto-detects Java 21, Maven runtime, and Windows Root trust store
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "PROJECT_DIR=%~dp0"

@REM Load environment variables from .env file if present
if exist "%PROJECT_DIR%.env" (
    for /f "usebackq tokens=1* delims==" %%A in ("%PROJECT_DIR%.env") do (
        set "ENV_KEY=%%A"
        set "ENV_VAL=%%B"
        if not "%%A"=="" (
            echo %%A | findstr /r "^#" >nul || set "%%A=%%B"
        )
    )
)

@REM Ensure Windows Root Certificate store is used for secure TLS/SSL handshakes
if not defined MAVEN_OPTS (
    set "MAVEN_OPTS=-Djavax.net.ssl.trustStoreType=WINDOWS-ROOT"
) else (
    echo %MAVEN_OPTS% | findstr /i "trustStoreType" >nul || set "MAVEN_OPTS=%MAVEN_OPTS% -Djavax.net.ssl.trustStoreType=WINDOWS-ROOT"
)

@REM If JAVA_HOME is not set or points to older JRE, prefer JDK 21
if not defined JAVA_HOME (
    if exist "C:\Users\ASUS\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.8.9-hotspot\bin\java.exe" (
        set "JAVA_HOME=C:\Users\ASUS\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.8.9-hotspot"
    ) else if exist "C:\Program Files\Java\jdk-24\bin\java.exe" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-24"
    )
)

@REM Check for cached Maven 3.9.16
set "CACHED_MVN=C:\Users\ASUS\.m2\wrapper\dists\apache-maven-3.9.16-bin\5grr65jo27hi51sujmtcldfovl\apache-maven-3.9.16\bin\mvn.cmd"
if exist "%CACHED_MVN%" (
    call "%CACHED_MVN%" %*
    goto :end
)

@REM Check system mvn
where mvn >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    mvn %*
    goto :end
)

echo [ERROR] Neither Apache Maven nor Maven distribution was found.
exit /b 1

:end
exit /b %ERRORLEVEL%
