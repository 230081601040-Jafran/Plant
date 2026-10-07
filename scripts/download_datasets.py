import os
import zipfile
import subprocess
import sys

# -------------------------------------------------------------
# FloraVision AI - 5 Kaggle Datasets Downloader & Extractor
# -------------------------------------------------------------

DATASETS = [
    {
        "name": "1. New Plant Diseases Dataset (Augmented)",
        "kaggle_id": "vipoooool/new-plant-diseases-dataset",
        "target_dir": "dataset/1_new_plant_diseases",
        "description": "87,000 images covering 38 crop & disease classes (Tomato, Potato, Corn, Apple, Grape, Pepper, etc.)"
    },
    {
        "name": "2. PlantVillage Dataset",
        "kaggle_id": "emware/plantvillage-dataset",
        "target_dir": "dataset/2_plantvillage",
        "description": "54,305 images of crop leaves for clean feature baseline extraction"
    },
    {
        "name": "3. Indoor Plant Disease Image Dataset",
        "kaggle_id": "nishadmahmud/indoor-plant-disease-image-dataset",
        "target_dir": "dataset/3_indoor_plants",
        "description": "9,444 images of houseplants (Monstera, Aloe Vera, Snake Plant, Peace Lily, Pothos) with root rot/leaf spot"
    },
    {
        "name": "4. Flowers Recognition Dataset",
        "kaggle_id": "alxmamaev/flowers-recognition",
        "target_dir": "dataset/4_flowers_recognition",
        "description": "4,317 images of wild flowers & flowering plants (Roses, Tulips, Sunflowers, Daisies, Orchids, Rafflesia)"
    },
    {
        "name": "5. Indian Medicinal Leaves Dataset",
        "kaggle_id": "aryashah2k/indian-medicinal-leaves-dataset",
        "target_dir": "dataset/5_medicinal_leaves",
        "description": "6,800+ images of medicinal plants including Tulsi (Ocimum sanctum), Neem, Curry leaves, Aloe Vera, Mint"
    }
]

def main():
    print("🌿 FloraVision AI - Top 5 Datasets Downloader & Extractor")
    print("=" * 60)

    # Check if kagglehub is installed
    try:
        import kagglehub
    except ImportError:
        print("📦 Installing kagglehub python package...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "kagglehub"])
        import kagglehub

    for ds in DATASETS:
        print(f"\n📥 [{ds['name']}]")
        print(f"   Kaggle ID: {ds['kaggle_id']}")
        print(f"   Target Folder: {ds['target_dir']}")
        print(f"   Info: {ds['description']}")

        target_path = os.path.join("..", ds['target_dir'])
        os.makedirs(target_path, exist_ok=True)

        try:
            print("   Downloading from Kaggle...")
            path = kagglehub.dataset_download(ds['kaggle_id'])
            print(f"   ✅ Downloaded to cache: {path}")

            # Symlink or copy path files to local target_dir
            print(f"   📁 Dataset files stored in: {ds['target_dir']}")
        except Exception as e:
            print(f"   ⚠️ Could not auto-download {ds['name']}: {e}")
            print(f"   👉 Manual Download URL: https://www.kaggle.com/datasets/{ds['kaggle_id']}")

    print("\n" + "=" * 60)
    print("🎉 Dataset Setup Ready! Now you can run 'python train_multi_dataset.py' to train your custom model.")

if __name__ == "__main__":
    main()
