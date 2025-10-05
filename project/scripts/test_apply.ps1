Param(
  [string]$Url = 'https://bloom-agent.netlify.app/api/apply'
)

$sample = @{ 
  instagram = '@test_user';
  fullName = 'Test User';
  university = 'Newcastle';
  degree = 'BA Testing';
  phone = '07123456789';
  whyYou = "I'm keen to join";
  experience = 'Some basic social media experience';
  femaleUK = $true;
  privacy = $true;
  website = ''
}

$body = $sample | ConvertTo-Json -Depth 10

Write-Host "Posting to $Url"
try {
  $resp = Invoke-RestMethod -Uri $Url -Method Post -ContentType 'application/json' -Body $body -ErrorAction Stop
  Write-Host "Response (parsed):" -ForegroundColor Green
  $resp | ConvertTo-Json -Depth 10
} catch {
  Write-Host "Request failed:" -ForegroundColor Red
  Write-Host $_.Exception.Message
  if ($_.Exception.Response) {
    try { $_.Exception.Response.GetResponseStream() | % { $_ } }
    catch { }
  }
  exit 2
}
