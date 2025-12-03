let selectedView = "AllAssets";
const views = ["AllAssets", "Laptops", "Monitors", "AddNewAsset"];
let assets = JSON.parse(localStorage.getItem("assets")) || [];

// Navigate between views
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
  const asset = {
    id,
    name,
    status: "Available",
    category: "AllAssets", // change later if you want
    location: "Main Office",
    assignee: "-"
  };

  assets.push(asset);
  localStorage.setItem('assets', JSON.stringify(assets));
  document.getElementById('newAssetName').value = '';
  renderAssets();
  navigate('AllAssets');
});

// Render assets in lists / tables
function renderAssets() {
  // Clear old content
  const assetList = document.getElementById('assetList');
  const laptopTable = document.getElementById('laptopList');
  const monitorTable = document.getElementById('monitorList');

  assetList.innerHTML = '';
  laptopTable.innerHTML = '';
  monitorTable.innerHTML = '';

  // Create table headers for laptops and monitors
  const headers = ['Image', 'Asset ID', 'Status', 'Category', 'Location', 'Assignee'];

  function createTableHeader(table) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
  }

  [laptopTable, monitorTable].forEach(table => {
    if (!table.querySelector('thead')) createTableHeader(table);
    if (!table.querySelector('tbody')) table.appendChild(document.createElement('tbody'));
  });

  const laptopTbody = laptopTable.querySelector('tbody');
  const monitorTbody = monitorTable.querySelector('tbody');

  assets.forEach(asset => {
    // Simple list for AllAssets
    const li = document.createElement('li');
    li.textContent = asset.name;
    assetList.appendChild(li);

    // Only include in tables if category matches
    if (asset.category === 'Laptops') {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="" alt="Image" width="50"/></td>
        <td>${asset.id}</td>
        <td>${asset.status}</td>
        <td>${asset.category}</td>
        <td>${asset.location}</td>
        <td>${asset.assignee}</td>
      `;
      laptopTbody.appendChild(tr);
    }

    if (asset.category === 'Monitors') {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="" alt="Image" width="50"/></td>
        <td>${asset.id}</td>
        <td>${asset.status}</td>
        <td>${asset.category}</td>
        <td>${asset.location}</td>
        <td>${asset.assignee}</td>
      `;
      monitorTbody.appendChild(tr);
    }
  });
}

// Initial render
renderAssets();
navigate(selectedView);
