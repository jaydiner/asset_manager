let selectedView = "AllAssets";
const views = ["AllAssets", "Laptops", "Monitors", "AddNewAsset"];
let assets = JSON.parse(localStorage.getItem("assets")) || [];

function navigate(view) {
  views.forEach(v => {
    document.getElementById(v).style.display = (v === view) ? "block" : "none";
  });
  selectedView = view;
}

// Left column category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.view));
});

// Add new asset button
document.getElementById('addAssetBtn').addEventListener('click', () => navigate('AddNewAsset'));

// Save new asset
document.getElementById('saveAssetBtn').addEventListener('click', () => {
  const name = document.getElementById('newAssetName').value;
  if (!name) return alert('Enter asset name');
  const id = Date.now();
  const asset = { id, name, category: "AllAssets" };
  assets.push(asset);
  localStorage.setItem('assets', JSON.stringify(assets));
  document.getElementById('newAssetName').value = '';
  renderAssets();
  navigate('AllAssets');
});

// Render assets in lists
function renderAssets() {
  const assetList = document.getElementById('assetList');
  const laptopList = document.getElementById('laptopList');
  const monitorList = document.getElementById('monitorList');

  assetList.innerHTML = '';
  laptopList.innerHTML = '';
  monitorList.innerHTML = '';

  assets.forEach(asset => {
    const li = document.createElement('li');
    li.textContent = asset.name;

    assetList.appendChild(li);
    if (asset.category === 'Laptops') laptopList.appendChild(li.cloneNode(true));
    if (asset.category === 'Monitors') monitorList.appendChild(li.cloneNode(true));
  });
}

// Initial render
renderAssets();
navigate(selectedView);