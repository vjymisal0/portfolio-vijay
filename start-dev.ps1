Set-Location "C:\Users\Vijay\portfolio-vijay"
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
npm run dev
