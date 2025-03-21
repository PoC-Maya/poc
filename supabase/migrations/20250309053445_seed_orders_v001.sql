-- Inserindo 10 pedidos na tabela 'orders'
INSERT INTO orders (content, created_at)
VALUES
    ('{
        "date": "2025-04-14T05:00:00.000Z",
        "time": "2025-04-13T16:30:00.000Z",
        "guests": {"adult": 4, "teenager": 0, "child": 0},
        "subtotal": 400,
        "platformFee": 12,
        "totalPrice": 412,
        "pricePerPerson": {"adult": 100, "teenager": 70, "child": 20, "average": 103},
        "guideName": "Alexandros",
        "product_title": "Tour in the-Cancun-history-lovers-tour",
        "product_slug": "the-Cancun-history-lovers-tour",
        "product_image": "https://sjc.microlink.io/P_HImDpuTTedqH8vMS3kDmaVKPiSoufv9N0rRUcX-r7DYAvxiKyVo6ouECsdQSgX1XGwkhgOqHewuaDONkJ9rw.jpeg",
        "product_id": "b69800e8-3a5e-4939-a0ec-17bedff5e1e1",
        "provider_id": "cb4ee20f-c4a0-4edc-a65f-03cae45eh172",
        "cancellationDate": "2025-04-11T05:00:00.000Z",
        "cancellationTime": "2025-04-12T16:30:00.000Z"
    }', NOW()),
    ('{
        "date": "2025-04-15T05:00:00.000Z",
        "time": "2025-04-13T16:45:00.000Z",
        "guests": {"adult": 3, "teenager": 1, "child": 0},
        "subtotal": 330,
        "platformFee": 10,
        "totalPrice": 340,
        "pricePerPerson": {"adult": 100, "teenager": 70, "child": 20, "average": 101},
        "guideName": "Sophia",
        "product_title": "History Tour of Mexico City",
        "product_slug": "history-tour-mexico-city",
        "product_image": "https://example.com/image.jpg",
        "product_id": "f59a8c9e-bb3b-423e-aaf8-4ac9358c6ad1",
        "provider_id": "cb4ee20f-c4a0-4edc-a65f-03cae45eh172",
        "cancellationDate": "2025-04-12T05:00:00.000Z",
        "cancellationTime": "2025-04-14T16:30:00.000Z"
    }', NOW()),
    ('{
        "date": "2025-04-16T05:00:00.000Z",
        "time": "2025-04-14T17:00:00.000Z",
        "guests": {"adult": 5, "teenager": 1, "child": 2},
        "subtotal": 500,
        "platformFee": 15,
        "totalPrice": 515,
        "pricePerPerson": {"adult": 100, "teenager": 70, "child": 20, "average": 103},
        "guideName": "John",
        "product_title": "Cultural Tour in Paris",
        "product_slug": "cultural-tour-paris",
        "product_image": "https://example.com/paris-image.jpg",
        "product_id": "e5a7c9b7-b3d1-4371-9394-38bf5b6eaac9",
        "provider_id": "d29b7c8a-c21d-4c51-bdb0-3062f6261b45",
        "cancellationDate": "2025-04-12T05:00:00.000Z",
        "cancellationTime": "2025-04-14T17:00:00.000Z"
    }', NOW()),
    ('{
        "date": "2025-04-17T05:00:00.000Z",
        "time": "2025-04-14T18:00:00.000Z",
        "guests": {"adult": 2, "teenager": 1, "child": 1},
        "subtotal": 280,
        "platformFee": 8,
        "totalPrice": 288,
        "pricePerPerson": {"adult": 100, "teenager": 70, "child": 20, "average": 98},
        "guideName": "Olivia",
        "product_title": "Excursion in Egypt Pyramids",
        "product_slug": "excursion-egypt-pyramids",
        "product_image": "https://example.com/egypt-image.jpg",
        "product_id": "fd8923a4-7597-4640-b428-4ac35844b9bc",
        "provider_id": "abcd1234-abcd-1234-abcd-1234abcd5678",
        "cancellationDate": "2025-04-12T05:00:00.000Z",
        "cancellationTime": "2025-04-14T18:00:00.000Z"
    }', NOW()),
    ('{
        "date": "2025-04-18T05:00:00.000Z",
        "time": "2025-04-15T16:30:00.000Z",
        "guests": {"adult": 2, "teenager": 0, "child": 0},
        "subtotal": 200,
        "platformFee": 5,
        "totalPrice": 205,
        "pricePerPerson": {"adult": 100, "teenager": 70, "child": 20, "average": 102},
        "guideName": "Liam",
        "product_title": "Tour in Australia",
        "product_slug": "tour-australia",
        "product_image": "https://example.com/australia-image.jpg",
        "product_id": "12d23fa4-bc6e-47f0-9d6d-64ac120d1f98",
        "provider_id": "e93a3c79-b40f-470b-b5c7-4ae4f3b8a0e6",
        "cancellationDate": "2025-04-12T05:00:00.000Z",
        "cancellationTime": "2025-04-14T16:30:00.000Z"
    }', NOW())
    ;
