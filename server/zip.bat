@echo off
:: ����ѹ��JS�ļ��ĸ�Ŀ¼�����Զ�ѹ�����е�JS�ļ�
SET JSFOLDER= ./dist/
chdir /d %JSFOLDER%
for /r . %%a in (*.js) do (
@echo ����ѹ�� %%~a ...
uglifyjs %%~fa -m -o %%~fa
)
echo ���!
pause & exit 0