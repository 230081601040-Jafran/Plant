import os
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV3Large
from tensorflow.keras import layers, models
import tensorflowjs as tfjs

# -------------------------------------------------------------
# FloraVision AI - Multi-Dataset Unified Trainer
# Combines: 
# 1. New Plant Diseases Dataset (Crops & Diseases)
# 2. PlantVillage Dataset (Crop Baseline)
# 3. Indoor Plant Disease Dataset (Houseplants)
# 4. Flowers Recognition (Wild & Ornamental Flowers)
# 5. Indian Medicinal Leaves (Tulsi, Neem, Medicinal Herbs)
# -------------------------------------------------------------

DATASET_ROOT = "../dataset"
MODEL_OUTPUT_DIR = "../public/model"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 12

def build_combined_model(num_classes):
    base_model = MobileNetV3Large(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    model = models.Sequential([
        layers.Rescaling(1./255),
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(512, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def main():
    print("🌿 FloraVision AI - Training Multi-Dataset Unified Model...")

    # Load dataset subfolders
    if not os.path.exists(DATASET_ROOT):
        print(f"❌ Error: {DATASET_ROOT} directory not found. Run download_datasets.py first!")
        return

    print("📁 Scanning dataset folders...")
    # Load image dataset from root
    try:
        train_ds = tf.keras.utils.image_dataset_from_directory(
            DATASET_ROOT,
            validation_split=0.2,
            subset="training",
            seed=42,
            image_size=IMG_SIZE,
            batch_size=BATCH_SIZE
        )

        val_ds = tf.keras.utils.image_dataset_from_directory(
            DATASET_ROOT,
            validation_split=0.2,
            subset="validation",
            seed=42,
            image_size=IMG_SIZE,
            batch_size=BATCH_SIZE
        )

        class_names = train_ds.class_names
        print(f"✅ Loaded {len(class_names)} Unified Classes from 5 Datasets!")

        model = build_combined_model(len(class_names))

        print("⚡ Training model across all 5 combined datasets...")
        model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

        os.makedirs(MODEL_OUTPUT_DIR, exist_ok=True)
        h5_path = os.path.join(MODEL_OUTPUT_DIR, "unified_plant_model.h5")
        model.save(h5_path)

        print("🌐 Converting trained weights to TensorFlow.js for the Browser...")
        tfjs.converters.save_keras_model(model, MODEL_OUTPUT_DIR)
        print("🎉 SUCCESS! Web Model saved to 'public/model/model.json'")
    except Exception as e:
        print(f"ℹ️ Training Info: Ensure dataset zip files are extracted into {DATASET_ROOT}/ subfolders.")

if __name__ == "__main__":
    main()
