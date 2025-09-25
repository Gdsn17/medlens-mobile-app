# 🔧 Manual Fix for EMFILE Error on macOS

## **Step 1: Install Watchman (Already Done ✅)**
```bash
brew install watchman
```

## **Step 2: Update System File Limits**
Run these commands in your terminal:

```bash
# Set temporary limits
sudo sysctl -w kern.maxfiles=524288
sudo sysctl -w kern.maxfilesperproc=524288

# Make changes persistent
echo "kern.maxfiles=524288" | sudo tee -a /etc/sysctl.conf
echo "kern.maxfilesperproc=524288" | sudo tee -a /etc/sysctl.conf
```

## **Step 3: Update Your Shell Profile**
Add this line to your `~/.zshrc`:

```bash
echo "ulimit -n 524288" >> ~/.zshrc
```

## **Step 4: Reload Configuration**
```bash
source ~/.zshrc
```

## **Step 5: Verify Limits**
```bash
ulimit -n
sysctl kern.maxfiles
sysctl kern.maxfilesperproc
```

You should see:
- `ulimit -n`: 524288
- `kern.maxfiles`: 524288
- `kern.maxfilesperproc`: 524288

## **Step 6: Test Your App**
After completing the above steps, restart your terminal and try:

```bash
cd /Users/godsonrupesroy/Desktop/Code/MENLENS-APP/frontend
npx expo start --ios
```

## **Alternative: Use the Fix Script**
If you prefer, you can run the fix script manually:

```bash
cd /Users/godsonrupesroy/Desktop/Code/MENLENS-APP
sudo ./fix-emfile.sh
```

## **Troubleshooting**
If you still get EMFILE errors:
1. Restart your Mac to ensure all system changes take effect
2. Close other applications that might be using many file descriptors
3. Use `npx expo start --tunnel` for Android testing
4. Use `npx expo start --ios` for iOS Simulator testing
