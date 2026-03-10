$status = git status --porcelain -uall
foreach ($line in $status) {
    if ($line.Trim() -ne '') {
        $file = $line.Substring(3).Trim('"')
        Write-Host "Processing $file"
        git add "`"$file`""
        $basename = Split-Path -Leaf $file
        git commit -m "Update $basename"
        git push
        Start-Sleep -Seconds 5
    }
}
